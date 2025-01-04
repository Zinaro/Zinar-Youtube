# Zinar YouTube Extension

This extension allows users to loop a specific portion of a YouTube video repeatedly. It is designed to let users define start and end times for a video segment, which will then loop until the user stops it.

## Features

- Define start and end points for a YouTube video segment
- Automatically loop the selected segment until stopped

## Requirements

- **Operating System**: Compatible with Windows, macOS, and Linux
- **Browser**: Firefox
- **Build Environment**: Node.js and npm installed

## Installation

1. Download the extension as a `.zip` file.
2. Extract the files and navigate to the directory in your terminal.
3. Ensure all files are in their original, unmodified state (not transpiled or minified).

## Building the Extension

To build the extension, follow these steps:

1. Make sure you have Node.js and npm installed.
2. Run the following command in the terminal from the root directory of the extension to bundle the files using Webpack:

   ```bash
   npx webpack --config webpack.config.ts
