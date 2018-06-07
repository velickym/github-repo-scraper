const phantom = require('phantom');
const express = require('express');
const app = express();

// jQuery with dependencies
let jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
const $ = jQuery = require('jquery')(window);

function extractData(html, owner, repo) {

    const document = $(html);
    const data = {};

    function warn(message) {
        console.warn("[" + owner + "/" + repo +"] : " + message);
    }

    // social counts strip (watchers/stars/forks)
    let socialCounts = document.find(".pagehead-actions a.social-count");
    if (socialCounts.length !== 3) {
        warn("Unable to parse social counts section.");
    } else {
        let count = index => socialCounts.eq(index).html().trim().replace(",", "");
        data.watchers = count(0);
        data.stars = count(1);
        data.forks = count(2);
    }

    // navigation bar (issues/pull-requests)
    let navigation = document.find(".reponav .Counter");
    if (navigation.length !== 3) {
        warn("Unable to parse navigation bar.");
    } else {
        let nav = index => navigation.eq(index).html().trim().replace(",", "");
        data.issues = nav(0);
        data.pullRequests = nav(1);
    }

    // numeric summaries (commits/branches/releases/contributors)
    let nums = document.find(".numbers-summary .num");
    if (nums.length !== 4) {
        warn("Unable to parse numeric summary section.");
    } else {
        let num = index => nums.eq(index).html().trim().replace(",", "");
        data.commits = num(0);
        data.branches = num(1);
        data.releases = num(2);
        data.contributors = num(3);
    }

    // other
    data.license = document.find(".numbers-summary li:last a").text().trim();
    data.lastCommit = document.find('span[itemprop="dateModified"] relative-time').attr("datetime");

    return data;
}

app.get("/:owner/:repo", (req, res) => {

    (async function () {

        let owner = req.params.owner.trim();
        let repo = req.params.repo.trim();
        let url = 'https://github.com/' + owner + '/' + repo;

        const instance = await phantom.create();
        const page = await instance.createPage();
        const status = await page.open(url);
        const content = await page.property('content');

        let json = extractData(content, owner, repo);
        res.json(json);

        console.log(owner + "/" + repo + " scraped : " + status);
        instance.exit();

    })(req, res);
});

app.listen(5000, () => console.log('Github repo scraper running on port ' + 5000));