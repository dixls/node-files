const fs = require('fs');
const axios = require('axios')
const argv = process.argv;
const path = argv[2]

function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error("there was an error: ", err)
            process.exit(1);
        }
        console.log(data);
    });
};

async function webCat(path) {
    await axios.get(path)
        .then(req => {
            console.log(req.data)
        })
        .catch(err => {
            console.log(`Error fetching ${path}: ${err}`)
        })
};


try {
    url = new URL(path);
    webCat(path);
}
catch {
    cat(path);
}