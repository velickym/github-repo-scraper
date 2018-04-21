const page = require('webpage').create();
const fs = require('fs');
const system = require('system');
const config = require("./config.json");
const owner = system.args[1];
const repo = system.args[2];

const url = 'https://github.com/' + owner + '/' + repo;
const path = config.outputDir + '/' + owner + '/' + repo;
console.log("Downloading as HTML : " + url);

page.open(url, function () {
    page.evaluate(function(){

    });

    console.log("Capturing into " + path + "/snapshot.png");
    page.render(path + '/snapshot.png');
    console.log("Downloading to " + path + "/repo.html");
    fs.write(path + '/repo.html', page.content, 'w');
    phantom.exit();
});