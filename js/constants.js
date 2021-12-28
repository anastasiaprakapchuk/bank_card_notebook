"use strict";

//URLs
const wayDB = "https://api.jsonbin.io/b/61cb27e5c912fe67c50a7168";
const secretKey =
  "$2b$10$XjxC.kAIp/B6vt0r1oWeLO6dkxXYMLYOqflTMkpcQ3GAPcKWEcjYi";

//Данные для построения формы
const dataForForm = [
  {
    label: "Номер карты",
    kind: "text",
    characters: "16",
    name: "number",
    type: "input",
  },
  {
    label: "Комментарий",
    kind: "longtext",
    characters: "1024",
    name: "comment",
    type: "textarea",
  },
];

export { wayDB, secretKey, dataForForm };
