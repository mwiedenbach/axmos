/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2025 Max Wiedenbach <max.wiedenbach@icloud.com>, All rights reserved.
 *  Licensed under the MIT. See LICENSE.txt for details.
 *--------------------------------------------------------------------------------------------*/

import fs from "fs";
import path from "path";
import println from "../utils/println";
import { Todo, todoList } from "./todos.service";

export const exportInMarkDown = () => {
    const list: Todo[] = JSON.parse(fs.readFileSync(todoList, "utf-8"));

    let checked: boolean = false;
    let name: string = "";

    const outPath: string = path.join(`${process.cwd()}/.axmos/`, `todo.${new Date().toISOString().split('T')[0]}.md`);

    // Writes the headline into the markdown file.
    fs.appendFileSync(outPath, `# TODO List ${new Date().toString()}\n\n`);

    // Writes todos inside of the file.
    list.forEach((todo) => {
        fs.appendFileSync(outPath, `${todo.completed ? "- [ X ]" : "- [ ]"} ${todo.name}\n`);
   });

    // file generated via axmos
    fs.appendFileSync(outPath, "\n\nFile was generated via axmos\n\n");

    println("Done");
};