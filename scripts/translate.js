const { spawn } = require("child_process");
const axios = require("axios");
const chalk = require("chalk");
const path = require("path");
const fse = require("fs-extra");

const spreadsheet = "https://docs.google.com/spreadsheets/d/1kOGhB2YNTZRjz-S6oVtMp7LkjhEfFaE7MHZNsMDAYgQ";
const script = "https://script.google.com/macros/s/AKfycbxluRIvTlSpa_F--CeEPKaKGYRrLkUu3GBqi_bbSPRk84st40Fr9HgAwtr69aSqmLVm/exec";
let [,, token] = process.argv;

(async function run() {
    if (token === "open") {
        spawn(`opener "${ spreadsheet }"`, { stdio: "inherit", shell: true });
        return;
    }

    const request = {
        json: { indexable: false, formattable: true },
        ts: { exportable: true, indexable: false, extension: "" },
        sheets: [
            { name: "resume", enabled: true, main: true, type: true },
            { name: "portfolio", enabled: true, main: false, type: true },
        ],
    };

    let data;
    try {
        console.log(chalk.cyan("Please wait for fetching the data from google..."));
        data = (await axios.post(script, request, { headers: { Authorization: `Bearer ${ token }` } })).data;
    }
    catch {
        console.log(chalk.red("Token Error: Please re-get the token!"));
        console.log(`1. Please open the spreadsheet: ${ chalk.yellow("npm run translate open") } or ${ chalk.blue(spreadsheet) }.`);
        console.log(`2. Click ${ chalk.yellow("[Scripts] > [Get the token]") }.`);
        console.log();
        return;
    }

    const output = path.resolve(__dirname, "..");

    console.log(chalk.cyan("Start to save the files..."));

    fse.writeFileSync(path.resolve(output, "src/models/langs/outline.json"), data.outline, { overwrite: true });
    fse.writeFileSync(path.resolve(output, "src/models/langs/LangFile.ts"), data.type, { overwrite: true });
    Object.entries(data.langs).forEach(([code, content]) => {
        fse.writeFileSync(path.resolve(output, `src/models/langs/${ code }.json`), content, { overwrite: true });
    });

    console.log(chalk.green("Done!"));
    console.log();
})();
