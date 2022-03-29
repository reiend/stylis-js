import { compile, serialize, stringify, middleware, prefixer } from "stylis";

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

const stylis = (strStyle, hasPrefixer = true) => {
  return serialize(
    compile(strStyle),
    middleware([hasPrefixer && prefixer, stringify])
  );
};

const camelCaseToKebab = (word) => {
  const kebabRegex = /([a-z])([A-Z][a-z])/g;
  return word.replace(kebabRegex, "$1-$2").toLowerCase();
}

const parseClass = (className) => {
  const classRegex = /^class_/g;
  return className.replace(classRegex, ".");
};

const parseID = (id) => {
  const idRegex = /^id_/g;
  return id.replace(idRegex, "#");
};

const card = {
  backgroundColor: "red",
  color: "black",
  backgroundColor: "blue",
  "&:hover": {
    border: "1px solid black",
  },
  div: {
    backgroundColor: "#ffffff",
    display: "flex",
  }
};

const css = (queryName, obj) => {
  const stringify = (key, obj) => {
    const pseudoFilter = Object.entries(obj).filter(([key, value]) => typeof value == "object");
    const directFilter = Object.entries(obj).filter(([key, value]) => typeof value != "object");

    const directStyle = directFilter.map(([key, value]) => `${camelCaseToKebab(key)}: ${value};`).join("");
    const pseudoStyle = pseudoFilter.map(([key, value]) => `${key} {${stringify(key, value)}}`);
    return [directStyle, pseudoStyle].join("");
  }
  return stylis([queryName, "{", stringify("", obj), "}"].join(""));
};

console.log(css(".card", card));

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
