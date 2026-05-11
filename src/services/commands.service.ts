/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2025 Max Wiedenbach <max.wiedenbach@icloud.com>, All rights reserved.
 *  Licensed under the MIT. See LICENSE.txt for details.
*--------------------------------------------------------------------------------------------*/

import { banner, Desc } from "../desc";
import println from "../utils/println";
import networkService from "./fetch.service";
import todoService from "./todos.service";

interface Command {
    execute(args?: string[]): void;
}

export const helpCommand = () => {
    println(banner);

    println(`\n${Desc.program_name} ${Desc.program_version}\n${Desc.copyright_holder},\n${Desc.license}\n`);

    println("Usage: node script.js [operation] [argument]");
    println("Operations: create, delete, list, check, uncheck");
};

const commands: Record<string, Command> = {
    create: { execute: (args) => todoService.create(args) },
    delete: { execute: (args) => todoService.delete(args) },
    check:  { execute: (args) => todoService.check(args) },
    uncheck: { execute: (args) => todoService.uncheck(args)},
    list:   { execute: () => todoService.list() },
    fetch: { execute: (args) => networkService.fetchData(args)}
};

export default commands;