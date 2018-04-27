const page = require('webpage').create();
const fs = require('fs');
const system = require('system');
const config = require("./config.json");
const owner = system.args[1];
const repo = system.args[2];

const url = 'https://github.com/' + owner + '/' + repo;
const path = config.outputDir + '/' + owner + '/' + repo;
console.log("Requested : " + url);

const resources = [];

page.open(url, function () {

    if (resources[0].status !== 200) {
        console.log(url + " resulted into " + resources[0].status);
        phantom.exit(1);
    }

    page.evaluate(function(){
    });

    console.log("Capturing into " + path + "/snapshot.png");
    page.render(path + '/snapshot.png');
    console.log("Downloading to " + path + "/repo.html");
    fs.write(path + '/repo.html', page.content, 'w');
    phantom.exit(0);
});

page.onResourceReceived = function (response) {
    // check if the resource is done downloading
    if (response.stage !== "end") return;
    // apply resource filter if needed:
    if (response.headers.filter(function (header) {
            if (header.name === 'Content-Type' && header.value.indexOf('text/html') === 0) {
                return true;
            }
            return false;
        }).length > 0)
        resources.push(response);
};