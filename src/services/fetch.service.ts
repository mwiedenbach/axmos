/*-----------------------------------------------------------------------------------------
 * Copyright (c) 2026 Max Wiedenbach <max.wiedenbach@icloud.com>, All rights reserved.
 * Licensed under the MIT License. See LICENSE.txt for details.
 *---------------------------------------------------------------------------------------*/

import Colors from "../utils/Colors";
import { loadConfigs } from "./fetch/config";
import { buildRequestUrl, createFetchOptions } from "./fetch/urlBuilder";

const logStatus = (passed: boolean, status: number) => {
    const label = passed
        ? `${Colors.Background.Green} PASS ${Colors.Reset}`
        : `${Colors.Background.Red} FAIL ${Colors.Reset}`;
    console.log(`${label} Server responded with: ${status}`);
};

const fetchData = async (routeKey: string) => {
    const mergedConfig = loadConfigs();
    const routeConfig = mergedConfig[routeKey];

    if (!routeConfig) {
        console.error(`${Colors.Background.Red} ERROR ${Colors.Reset} No config for: "${routeKey}"`);
        return;
    }

    const url = buildRequestUrl(routeConfig);
    console.log(`Fetching ${url}...`);

    try {
        const response = await fetch(url, createFetchOptions(routeConfig));

        if (routeConfig.expected?.status) {
            const isCorrect = response.status === routeConfig.expected.status;
            logStatus(isCorrect, response.status);
        }

        const data = await response.json();
        console.log(`Status: ${response.status}\n`, JSON.stringify(data, null, 2));
        return data;
    } catch (e) {
        console.error(`${Colors.Background.Red} CONN FAIL ${Colors.Reset}`, e);
    }
};

export default { fetchData };