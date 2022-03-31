"use strict";

import { toKebab } from "./helpers.js";

const stringify = (cssObject, queryName = "") => {
  const toString = (key, cssObject) => {
    const pseudoFilter = Object.entries(cssObject).filter(
      ([key, value]) => typeof value == "object"
    );
    const directFilter = Object.entries(cssObject).filter(
      ([key, value]) => typeof value != "object"
    );
    const directStyle = directFilter
      .map(([key, value]) => [toKebab(key), ":", value, ";"].join(""))
      .join("");
    const pseudoStyle = pseudoFilter.map(([key, value]) =>
      [key, "{", toString(key, value), "}"].join("")
    );
    return [directStyle, pseudoStyle].join("");
  };
  return [queryName, "{", toString("", cssObject), "}"].join("");
};

export { stringify };
