import path from "path";
import { promises as fs } from "fs";

const makeDataDir = async (dataDir) => {
    try {
        return await fs.mkdir(dataDir, { recursive: true });
    } catch (e) {
        console.log(`Failed creating file: ${e}`);
    }
};

export const readFromFile = async (pathToFile) => {
    try {
        const data = await fs.readFile(pathToFile, "utf-8");
        return data;
    } catch (e) {
        console.log(`Failed reading from file: ${e}`);
    }
};

export const writeToFile = async (pathToFile, data) => {
    try {
        await makeDataDir(path.dirname(pathToFile));
        await fs.writeFile(pathToFile, data);
    } catch (e) {
        console.log(`Failed writing to file: ${e}`);
    }
};

export const fileExists = async (filePath) => {
    try {
        await fs.access(filePath, fs.constants.F_OK);
        return true;
    } catch (_e) {
        return false;
    }
};
