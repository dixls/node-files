const fs = require('fs');
const axios = require('axios');
const { callbackify } = require('util');
const argv = process.argv;
let path = argv[2]

async function cat(path, callBack) {
    let data = fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error("there was an error: ", err)
            process.exit(1);
        }
        callBack(data);
    });
};

async function webCat(path, callBack) {
    return await axios.get(path)
        .then(req => {
            callBack(req.data)
        })
        .catch(err => {
            console.error(`Error fetching ${path}: ${err}`)
            process.exit(1)
        })

};

async function write(data, outPath = argv[3]) {
    fs.writeFile(outPath, data, "utf8", function (err) {
        if (err) {
            console.error(`some error: ${err}`)
            process.exit(1)
        }
    })
}

async function checkIfWrite(argv) {
    if (argv[2] == "--out") {
        path = argv[4]
        callBack = write
    }
    else {
        callBack = console.log
    }
    try {
        url = new URL(path);
        webCat(path, callBack);
        
    }
    catch {
        cat(path, callBack);
    }
}

checkIfWrite(argv)