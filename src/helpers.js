"use strict";

const toKebab = (word) =>
  word.replace(/([a-z])([A-Z][a-z])/g, "$1-$2").toLowerCase();
const parseClass = (className) => className.replace(/^class_/g, ".");
const parseID = (id) => id.replace(/^id_/g, "#");
const toCapitalize = (str) => str[0].toUpperCase() + str.slice(1);

export { toKebab, parseClass, parseID, toCapitalize };
