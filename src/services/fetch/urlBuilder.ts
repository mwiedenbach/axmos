/*-----------------------------------------------------------------------------------------
 * Copyright (c) 2026 Max Wiedenbach <max.wiedenbach@icloud.com>, All rights reserved.
 * Licensed under the MIT License. See LICENSE.txt for details.
 *---------------------------------------------------------------------------------------*/

import { DataStructure } from "../../typings/fetchData";

type RouteConfig = DataStructure[string];

export const buildRequestUrl = (config: RouteConfig): string => {
    const protocol = config.protocol ?? "https";
    const uri = config.uri.replace(/^\//, "");
    const port = config.port ? `:${config.port}` : "";
    return `${protocol}://${config.origin}${port}/${uri}`;
};

export const createFetchOptions = (config: RouteConfig): RequestInit => ({
    method: config.method,
    headers: config.headers,
    body: config.body ? JSON.stringify(config.body) : undefined,
    signal: config.timeout ? AbortSignal.timeout(config.timeout) : undefined,
});