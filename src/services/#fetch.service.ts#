/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2025 Max Wiedenbach <max.wiedenbach@icloud.com>, All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt for details.
*--------------------------------------------------------------------------------------------*/

import fs from "fs";
import path from "path";
import { DataStructure } from "../typings/fetchData";

const isPresent = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export const readConfigFile = (): DataStructure[] => {
  const dotAxmosFolder = path.join(process.cwd(), ".axmos/");

  if (!fs.existsSync(dotAxmosFolder)) return [];

  return fs
    .readdirSync(dotAxmosFolder)
    .map(file => {
      try {
        return JSON.parse(
          fs.readFileSync(path.join(dotAxmosFolder, file), "utf-8")
        ) as DataStructure;
      } catch {
        return null;
      }
    })
    .filter(isPresent);
};

const fetchData = async (args: string) => {
  const configs = readConfigFile();

  if (configs.length === 0) {
    console.log("Please provide a valid json file.");
    return;
  }

  const mergedConfig = configs.reduce<DataStructure>((acc, curr) => {
    return { ...acc, ...curr };
  }, {} as DataStructure);

  const extractedRoute = mergedConfig[args];

  if (!extractedRoute) {
    console.error(`No config found for route: "${args}"`);
    return;
  }

  const protocol = extractedRoute.protocol ?? "https";
  const uri = extractedRoute.uri.replace(/^\//, ""); // strip leading slash
  const req = `${protocol}://${extractedRoute.origin}:${extractedRoute.port}/${uri}`;

  console.log(`Fetching ${req}...`);

  try {
    const res = await fetch(req, {
      method: extractedRoute.method,
      headers: extractedRoute.headers,
      body: extractedRoute.body ? JSON.stringify(extractedRoute.body) : undefined,
      signal: extractedRoute.timeout
        ? AbortSignal.timeout(extractedRoute.timeout)
        : undefined,
    });

    if (!res) {
      console.error(`Request failed: ${res}`);
      return;
    }

    const data = await res.json();
    console.log(data);
    return data;
    
  } catch (e) {
    console.error("Connection failed:", e);
  }
};

const networkService = {
  fetchData,
};

export default networkService;