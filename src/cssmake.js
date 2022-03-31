"use strict";

import { useRm, useWriteFile, useMkdir } from "./hooks/fileSystem.js";
import { compile, serialize, stringify, middleware, prefixer } from "stylis";

const CssMake = () => {
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

  const cssMake = {
    init,
    setStyle,
    getStyle,
  };

  return cssMake;
};

export default CssMake;
