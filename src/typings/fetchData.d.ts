/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2025 Max Wiedenbach <max.wiedenbach@icloud.com>, All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt for details.
*--------------------------------------------------------------------------------------------*/


type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface EndpointConfig {
    protocol: 'http' | 'https';
    origin: string;
    port?: number;
    uri: string;
    method: HttpMethod;
    // Optionals
    headers?: Record<string, string>;
    body?: unknown;
    timeout?: number;
    expected?: {
        status?: number;
    }
}

export interface DataStructure {
    [path: string]: EndpointConfig;
}
