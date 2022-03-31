"use strict";

import { stringify } from "./stringify.js";
import { CssMake } from "./cssmake.js";
import {
  compile,
  serialize,
  stringify as stylisStringify,
  middleware,
  prefixer,
} from "stylis";

const Stylis = () => {
  let stylis = null;

  const process = (strStyle, hasPrefixer = true) =>
    serialize(
      compile(strStyle),
      hasPrefixer
        ? middleware([prefixer, stylisStringify])
        : middleware([stylisStringify])
    );

  const stringified = (
    cssObject,
    queryName,
    processOptions = { isProcess: false, hasPrefixer: true }
  ) => {
    const { isProcess, hasPrefixer } = processOptions;
    if (isProcess) return process(stringify(cssObject, queryName), hasPrefixer);
    return stringify(cssObject, queryName);
  };

  stylis = {
    css: {
      stringified,
    },
  };
  return stylis;
};

export default Stylis;
export { CssMake };
