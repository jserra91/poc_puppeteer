## Installation

``
npm i
``

## Test:

``
node .\src\index.js <URL> chart1.png
``

## Build

``
npm i -g esbuild

esbuild .\src\index.js --bundle --platform=node --target=node10.4 --outfile=./dist/printScript.js
``

## Test Result

``
node .\dist\printScript.js <URL> chart1.png
``