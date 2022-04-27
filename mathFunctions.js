const add = function (firstNumber, secondNumber) {
  return firstNumber + secondNumber;
};

const sub = function (firstNumber, secondNumber) {
  return firstNumber - secondNumber;
};

const mul = function (firstNumber, secondNumber) {
  return firstNumber * secondNumber;
};

const div = function (firstNumber, secondNumber) {
  return firstNumber / secondNumber;
};

const integerDvision = function (firstNumber, secondNumber) {
  return Math.floor(firstNumber / secondNumber);
};

const remainder = function (firstNumber, secondNumber) {
  return firstNumber % secondNumber;
};

const power = function (firstNumber, secondNumber) {
  let result = 1;
  for (let index = 0; index < secondNumber; index++) {
    result = result * firstNumber;
  }
  return result;
};

let math = {
  'add': add,
  'sub': sub,
  'mul': mul,
  'div': div,
  'intDiv': integerDvision,
  'remainder': remainder,
  'power': power
};
