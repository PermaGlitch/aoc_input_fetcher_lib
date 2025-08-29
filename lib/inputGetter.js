import path from "path";
import axios from "axios";
import dotenv from "dotenv";

import { writeToFile, fileExists, readFromFile } from "./fileHandlers.js";

dotenv.config();

const cookie = process.env.AOC_TOKEN;
const DATA_DIR = process.env.DATA_DIR;

const tokenizedAxios = axios.create({
    baseURL: "https://adventofcode.com",
    headers: { "Cookie": cookie },
});

const inputUrl = (year, day) => `/${year}/day/${day}/input`;
const fileName = (year, day) => `y${year}d${String(day).padStart(2, "0")}.txt`;

const getYearDayInput = async (year, day) => {
    try {
        const input = await tokenizedAxios.get(inputUrl(year, day));
        return input.data;
    } catch (e) {
        console.log(`Error getting input from AoE: ${e}`);
    }
};

const getInputToFile = async (year, day) => {
    try {
        const data = await getYearDayInput(year, day);
        console.log(data);
        await writeToFile(path.join(DATA_DIR, fileName(year, day)), data.trim());
        return data.trim();
    } catch (e) {
        console.log(`Failed putting input to file: ${e}`);
    }
};

export const readInput = async (year, day) => {
    try {
        if (!(await fileExists(path.join(DATA_DIR, fileName(year, day))))) {
            const data = await getInputToFile(year, day);
            return data;
        };

        return await readFromFile(path.join(DATA_DIR, fileName(year, day)));
    } catch (e) {
        console.log(`Failed getting input from file: ${e}`);
    }
};
