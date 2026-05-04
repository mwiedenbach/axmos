/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2025 Max Wiedenbach <max.wiedenbach@icloud.com>, All rights reserved.
 *  Licensed under the MIT. See LICENSE.txt for details.
*--------------------------------------------------------------------------------------------*/


export enum ErrorCodes {
    Success         = 0,
    UnknownError    = 1,
    CLIError        = 2,
    OperationError  = 3,
    PrivilegesError = 4
}; 

export type ErrorType = 
    | "CLI"
    | "OPERATION"
    | "PRIVILEGES";

export const newError = (
    type: ErrorType, 
    error: Error, 
    code: number, 
): never => {
    throw new Error(`[ ${type} ] ${error.message}`);
}

export const safe = async <T>(
    fn: () => Promise<T>
): Promise<[T, null] | [null, Error]> => {
    try {  
        const data = await fn();
        return [data, null];
    } catch (error: unknown) {
        const err = error instanceof Error ? error : new Error(String(error));
        return [null, err];
    }
};

