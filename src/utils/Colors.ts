/*-----------------------------------------------------------------------------------------
 * Copyright (c) 2026 Max Wiedenbach <max.wiedenbach@icloud.com>, All rights reserved.
 * Licensed under the MIT License. See LICENSE.txt for details.
 *---------------------------------------------------------------------------------------*/

const Colors = {
    Regular: {
        Black: "\x1b[0;30m",
        Red: "\x1b[0;31m",
        Green: "\x1b[0;32m",
        Yellow: "\x1b[0;33m",
        Blue: "\x1b[0;34m",
        Purple: "\x1b[0;35m",
        Cyan: "\x1b[0;36m",
        White: "\x1b[0;37m",
    },
    Bold: {
        Black: "\x1b[1;30m",
        Red: "\x1b[1;31m",
        Green: "\x1b[1;32m",
        Yellow: "\x1b[1;33m",
        Blue: "\x1b[1;34m",
        Purple: "\x1b[1;35m",
        Cyan: "\x1b[1;36m",
        White: "\x1b[1;37m",
    },
    Background: {
        Black: "\x1b[40m",
        Red: "\x1b[41m",
        Green: "\x1b[42m",
        Yellow: "\x1b[43m",
        Blue: "\x1b[44m",
        Purple: "\x1b[45m",
        Cyan: "\x1b[46m",
        White: "\x1b[47m",
    },
    Reset: "\x1b[0m",
} as const;

export default Colors;