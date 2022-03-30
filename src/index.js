"use strict";

import {
  compile,
  serialize,
  stringify,
  middleware,
  prefixer,
  whitespace,
} from "stylis";

import { useRm, useWriteFile, useMkdir } from "./hooks/fileSystem.js";

// Todo make this use object instead
// temp

const styleDiv = `
  .card {
    display: flex;
    &-title { 
      display: flex;
    }
    div {
      border: 1px solid black;
    }
  }
`;

const toKebab = (word) => {
  const kebabRegex = /([a-z])([A-Z][a-z])/g;
  return word.replace(kebabRegex, "$1-$2").toLowerCase();
};

const parseClass = (className) => {
  const classRegex = /^class_/g;
  return className.replace(classRegex, ".");
};

const parseID = (id) => {
  const idRegex = /^id_/g;
  return id.replace(idRegex, "#");
};


const toCapitalize = (str) => str[0].toUpperCase() + str.slice(1);


const stylis = () => {

  const toValidCss = (strStyle, hasPrefixer = true) =>
    serialize(
      compile(strStyle),
      middleware([hasPrefixer && prefixer, stringify])
    );

  const asString = (queryName, obj) => {
    const toString = (key, obj) => {
      const pseudoFilter = Object.entries(obj).filter(
        ([key, value]) => typeof value == "object"
      );
      const directFilter = Object.entries(obj).filter(
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
    return toValidCss([queryName, "{", toString("", obj), "}"].join(""));
  };

  const asObject = (css) => {
    const splitDirectAndPseudo = css.split(";");
    const headQueryNameRegex = /((\#|\.)?\w+(?=\{))/;
    const headQueryName = css.match(headQueryNameRegex)[0];
    const nestedQueryNameRegex = new RegExp(headQueryName, "g");
    const cleanCssString = css
      .replace(headQueryNameRegex, "")
      .replace(nestedQueryNameRegex, "&");

    const toObject = (css) => {
      console.log(css);
    };

    toObject(cleanCssString);
  };

  const stylisObject = {
    asString,
    asObject,
  };

  return stylisObject;
};


const card = {
  backgroundColor: "red",
  color: "black",
  backgroundColor: "blue",
  "&:hover": {
    border: "1px solid black",
  },
  div: {
    backgroundColor: "black",
  },
};

const testStyleStr =
  ".card{background-color:blue;color:black;}.card:hover{border:1px solid black;}.card div{background-color:black;}";
const testStyleObj = {
  div: {
    backgroundColor: "blue",
  },
};

console.log(stylis().asString(".card", card))

const App = () => {
  const DISTRUBUTION_PATH = "./dist";
  const DISTRUBUTION_DEV_PATH = "./dist/dev";
  const DISTRUBUTION_PROD_PATH = "./dist/prod";
  let style = null;

  const setStyle = (strStyle, hasPrefixer = true) => {
    style = serialize(
      compile(strStyle),
      middleware([hasPrefixer && prefixer, stringify])
    );
    return app;
  };

  const getStyle = () => style;

  const init = async () => {
    await useRm(DISTRUBUTION_PATH);
    await useMkdir(DISTRUBUTION_PATH);
    await useMkdir(DISTRUBUTION_DEV_PATH);
    await useWriteFile(`${DISTRUBUTION_PATH}/dev/main.css`, getStyle());
  };

  const app = {
    init,
    setStyle,
    getStyle,
  };
  return app;
};

App().setStyle(styleDiv).init();
