"use strict";
import Model from "./js/Model.js";
import View from "./js/View.js";
import Controller from "./js/Controller.js";

import { RequestGetCards } from "./js/fetch.js";
import { wayDB } from "./js/constants.js";

buildApp(); //строим список карт, содержащихся в currentList

async function buildApp() {
  let currentList = await RequestGetCards(wayDB); //запрос к серверу

  //функция инициализации cписка
  function initializationList(list) {
    //передаем функции cписок
    // создаём все три компонента
    let model = new Model();
    let view = new View();
    let controller = new Controller();

    // увязываем компоненты друг с другом
    let containerApp = document.getElementById("app");
    let containerList = document.getElementById("list");

    model.start(view, list);
    view.start(model, containerApp, containerList);
    controller.start(model, containerApp, containerList);

    // инициируем первичное отображение
    model.update(); //обновляем представление
    controller.update(); //обновляем подписки на события
  }

  // инициализация текущего списка
  initializationList(currentList);
}
