/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2025 Max Wiedenbach <max.wiedenbach@icloud.com>, All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt for details.
*--------------------------------------------------------------------------------------------*/

import fs from "fs";
import path from "path";


const isPresent = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export const readConfigFile = (): string[] => {
    
    const currentDir = process.cwd();

    const dotAxmosFolder: string = path.join(currentDir, ".axmos/");

    /** 
     * Validates if there is a .axmos folder
     * if not then returns from the function
     */
    if (!fs.existsSync(dotAxmosFolder)) return [];


    const files = fs.readdirSync(dotAxmosFolder);

    const configs: string[] = files
        .map(file => {
            const filePath = path.join(dotAxmosFolder, file);
            try {
                return JSON.parse(fs.readFileSync(filePath, "utf-8"));
            } catch (e) {
                return null; 
            }
        })
        .filter(isPresent); // Hier glänzt dein Type Guard!

    return configs;
}


const fetchData = (args: unknown) => {
    const configsFounded = readConfigFile();

    console.log(configsFounded);

}

const networkService = {
    fetchData: fetchData,
};

export default networkService;