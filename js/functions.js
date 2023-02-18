function checkStringLength(string, stringLength) {
  return string.toString().length <= stringLength;
}

function isPalindrom(string) {
  return string.toLowerCase().replaceAll(' ', '') === string.toLowerCase().replaceAll(' ', '').split('').reverse().join('');
}

function getNumber(string) {
  let number = '';
  const currentString = string.toString().replaceAll(' ', '');
  const template = new RegExp('[0-9]');

  for (let i = 0; i < currentString.length; i++) {
    if (template.test(currentString[i])) {
      number += currentString[i];
    }
  }

  if (number.length === 0) {
    return NaN;
  }

  return Number(number);
}

function complementString(string, minLength, addedString) {
  return string.padStart(minLength, addedString);
}
