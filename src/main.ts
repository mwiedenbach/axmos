/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2025 Max Wiedenbach <max.wiedenbach@icloud.com>, All rights reserved.
 *  Licensed under the MIT. See LICENSE.txt for details.
*--------------------------------------------------------------------------------------------*/


import commands, { helpCommand } from "./services/commands.service";
import println from "./utils/println";
import { safe } from "./errorHandling";

const main = async () => {
    const op = process.argv[2];
    
    if (op && commands[op]) {
        const args = process.argv.slice(3);
        commands[op].execute(args);
    } else {
        helpCommand();
    }
        
}

main().catch((error: unknown) => {
    const err: Error = error instanceof Error ? error : new Error(String(error));

    println(`Uknown Error: ${err.message}`);
});
