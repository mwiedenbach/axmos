#!/bin/sh

npx esbuild src/main.ts --bundle --platform=node --outfile=dist/main.js --target=node20

# build binary file
node --build-sea sea-config.json