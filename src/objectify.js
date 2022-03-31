"use strict";

const objectify = (css) => {
  const splitDirectAndPseudo = css.split(";");
  const headQueryNameRegex = /((\#|\.)?\w+(?=\{))/;
  const headQueryName =
    css.match(headQueryNameRegex) && css.match(headQueryNameRegex)[0];
  const nestedQueryNameRegex = new RegExp(headQueryName, "g");
  const styleBlockBracesRegex = /^\{|\}$/g;
  let stringResult = null;

  if (headQueryName) {
    stringResult = css
      .replace(headQueryNameRegex, "")
      .replace(nestedQueryNameRegex, "&")
      .replace(styleBlockBracesRegex, "");
  } else {
    stringResult = css.replace(nestedQueryNameRegex, "&");
  }

  const toObject = (css) => {
    console.log(css.split(";"));
  };

  toObject(stringResult);
};

export { objectify };
