import { mkdir, rm, writeFile } from "fs/promises";
import { Buffer } from "buffer";

const fullFill = async (promise) => {
  if (promise instanceof Function) {
    try {
      const data = await promise();
      return [data, null];
    } catch (err) {
      return [null, err];
    }
  }
};

const useMkdir = async (path) => fullFill(() => mkdir(path));

const useRm = async (path, options = { recursive: true, force: true }) =>
  fullFill(() => rm(path, options));

const useWriteFile = async (file, inputData) =>
  fullFill(() => writeFile(file, new Uint8Array(Buffer.from(inputData))));

export { useRm, useMkdir, useWriteFile };

