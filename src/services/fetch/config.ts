/*-----------------------------------------------------------------------------------------
 * Copyright (c) 2026 Max Wiedenbach <max.wiedenbach@icloud.com>, All rights reserved.
 * Licensed under the MIT License. See LICENSE.txt for details.
 *---------------------------------------------------------------------------------------*/

import fs from "fs";
import path from "path";
import { DataStructure } from "../../typings/fetchData";

const isPresent = <T>(value: T | null | undefined): value is T => value != null;

export const loadConfigs = (): DataStructure => {
    const dotAxmosFolder = path.join(process.cwd(), ".axmos/");
    if (!fs.existsSync(dotAxmosFolder)) return {};

    const files = fs.readdirSync(dotAxmosFolder);

    return files
        .map(file => {
            try {
                return JSON.parse(fs.readFileSync(path.join(dotAxmosFolder, file), "utf-8"));
            } catch {
                return null;
            }
        })
        .filter(isPresent)
        .reduce((acc, curr) => ({ ...acc, ...curr }), {} as DataStructure);
};