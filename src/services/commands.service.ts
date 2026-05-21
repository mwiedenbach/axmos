/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2025 Max Wiedenbach <max.wiedenbach@icloud.com>, All rights reserved.
 *  Licensed under the MIT. See LICENSE.txt for details.
*--------------------------------------------------------------------------------------------*/

import { banner, Desc } from "../desc";
import println from "../utils/println";
import networkService from "./fetch.service";
import todoService from "./todos.service";

interface Command {
    execute: (args: string[]) => void | Promise<void>;
}

export const helpCommand = () => {
    println(banner);

    println(`\n${Desc.program_name} ${Desc.program_version}\n${Desc.copyright_holder},\n${Desc.license}\n`);

    println("Usage: axmos [operation] [argument]");
    println("--- TODOS ---");
    println("Operations: create, delete, list, check, uncheck, export");
    println("--- NETWORKING ---");
    println("Operations: fetch");
};

const commands: Record<string, Command> = {
    create: { execute: (args) => todoService.create(args) },
    delete: { execute: (args) => todoService.delete(args) },
    check:  { execute: (args) => todoService.check(args) },
    uncheck: { execute: (args) => todoService.uncheck(args)},
    list:   { execute: () => todoService.list() },
	export: { execute: () => todoService.export() },
    import: { execute: (args) => todoService.import(args) },
    fetch: { execute: (args) => networkService.fetchData(args[0]) }
};

export default commands;
