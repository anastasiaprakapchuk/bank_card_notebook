"use strict";
import { wayDB } from "./constants.js";
import { secretKey } from "./constants.js";

//в качестве сервера используется JSONBin.io

//функция получения cписка банковских карт
async function RequestGetCards() {
  try {
    let response = await fetch(wayDB, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "secret-key": secretKey,
      },
    });
    let data = await response.json();
    return data.cards;
  } catch (error) {
    console.error(error);
  }
}

//запрос на сервер об обновлении списка карт
async function RequestUpdateCards(newCards) {
  try {
    await fetch(wayDB, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "secret-key": secretKey,
        versioning: "false",
      },
      body: JSON.stringify({ cards: newCards }),
    });
  } catch (error) {
    console.error(error);
  }
}

export { RequestGetCards, RequestUpdateCards };
