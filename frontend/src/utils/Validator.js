// класс валидации строк
class Validator {

  // проверка является ли строка датой формата yyyy-mm-dd
  isValidDate (dateString) {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) {
      return false
    }
    const d = new Date(dateString);
    const dNum = d.getTime();
    if (!dNum && dNum !== 0) {
      return false
    }
    return d.toISOString().slice(0,10) === dateString;
  }

  // проверка является ли строка числом
  isValidNumber (numberString) {
    const numberRegEx = /^[0-9]*\.?[0-9]*$/
    if (!numberString.match(numberRegEx)) {
      return false 
    }
    return true
  }
}

export default new Validator()
