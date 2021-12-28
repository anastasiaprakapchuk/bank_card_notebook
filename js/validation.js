"use strict";

const number = (value) => /^\d{16}$/.test(value);//---номер карты
const comment = (value) => value.length <= 1024;//----комментарий

const validationLogo = (value) => {
  if (/^4/.test(value)) {//---------------------------VISA
    return "visa";
  } else if (/^(51|52|53|54|55)/.test(value)) {//-----MasterCard
    return "mastercard";
  } else {
    return null;
  }
};

function validationNewCard(objectForValidation) {
  let keys = Object.keys(objectForValidation);
  let errors = [];

  keys.forEach((key) => {
    let validField;
   
      if(key==="number"){ 
        validField = number(objectForValidation["number"]);
        !validField &&
          errors.push({ ["number"]: "Номер должен состоять из 16 цифр" });}
       
      if(key==="comment"){
        validField = comment(objectForValidation["comment"]);
        !validField &&
          errors.push({ ["comment"]: "Должно быть не более 1024 знаков" });}
        
    
  });

  return errors;
}

export { validationNewCard, validationLogo };
