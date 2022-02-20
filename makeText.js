/** Command-line tool to generate Markov text. */
const {MarkovMachine} = require("./markov");
const { default: axios } = require("axios");
const fs = require("fs");
const argv = process.argv;

function markovText (data) {
    const MM = new MarkovMachine(data);

    console.log(MM.makeText());
}

function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }

        markovText(data);
    });
}

async function webCat(path) {
    try {
        let resp = await axios.get(path);
        markovText(resp.data);
    }
    catch (err){
        console.error(err);
    }
}

function getData() {
    const filetype = argv[2];
    const path = argv[3];

    if (filetype == "file") {
        cat(path);
    }
    else if (filetype == "url") {
        webCat(path);
    }
    else
        console.log("This isn't a text file or a web address! Try again.");
}

getData();