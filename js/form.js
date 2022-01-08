"use strict";
import IMask from "imask";

import { dataForForm } from "./constants.js";
import "../css/form.css";

//функция построения посредствам DOM формы для новой карты
function buildFormForNewCard(card) {
  let newCard = document.querySelector("#newCard");
  let newGlass = document.createElement("div");
  let newForm = document.createElement("form");
  let newTitle = document.createElement("div");
  let newDataCard = document.createElement("div");
  let newLogo = document.createElement("div");
  let newImg = document.createElement("img");
  let newTable = document.createElement("table");

  newCard.appendChild(newGlass);
  newGlass.appendChild(newForm);
  newForm.appendChild(newTitle);
  newForm.appendChild(newDataCard);
  newDataCard.appendChild(newLogo);
  newDataCard.appendChild(newTable);

  newGlass.setAttribute("class", "glass");
  newTitle.setAttribute("class", "titleForm");
  newTitle.innerHTML = card ? "Текущая карта" : "Новая карта";
  newDataCard.setAttribute("class", "dataCard");
  newLogo.appendChild(newImg);
  newLogo.setAttribute("class", "logoForm");
  card
    ? newImg.setAttribute("src", `img/logo-${card.logo}.png`)
    : newImg.setAttribute("src", "");
  newImg.setAttribute("id", "logoNewCard");

  dataForForm.forEach((item) => {
    let newTr = document.createElement("tr");
    newTable.appendChild(newTr);

    let keys = Object.keys(item);

    keys.forEach((key) => {
      switch (key) {
        case "label":
          let newLabel = document.createElement("label");
          let newTextLabel = document.createTextNode(item[key]);

          newTr.appendChild(newLabel);
          newLabel.appendChild(newTextLabel);
          break;
        case "kind":
          let atrSize = item["characters"];
          let typeField = item["type"];
          let nameField = item["name"];

          let newField = document.createElement(typeField);
          let newSpan = document.createElement("span");

          newTr.appendChild(newField);
          newTr.appendChild(newSpan);

          nameField === "comment" && newField.setAttribute("rows", 5);
          nameField === "comment" &&
            newField.setAttribute("maxlength", atrSize);

          let maskOptions = {
            mask: "0000000000000000",
          };
          let mask = nameField === "number" && IMask(newField, maskOptions);

          newField.setAttribute("type", item[key]);
          newField.setAttribute("size", atrSize);
          newField.setAttribute("class", nameField);
          newSpan.setAttribute("class", nameField + "Span");
          card && newField.setAttribute("value", card[nameField]);
          nameField === "comment" &&
            card &&
            (newField.innerHTML = card[nameField]);
          break;
      }
    });
  });

  let buttonSave = document.createElement("input");
  let buttonCancel = document.createElement("input");

  newForm.appendChild(buttonSave);
  newForm.appendChild(buttonCancel);

  buttonSave.setAttribute("type", "button");
  buttonCancel.setAttribute("type", "button");

  buttonSave.setAttribute("value", "Сохранить");
  buttonCancel.setAttribute("value", "Отмена");

  buttonSave.setAttribute("id", "saveButton");
  buttonCancel.setAttribute("id", "cancelButton");
}

export { buildFormForNewCard };
