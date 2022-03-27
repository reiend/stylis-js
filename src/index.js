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
