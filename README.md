# Github repository scraper

Extracts public information from given Github repository. Uses phantomjs, express & jQuery.

### Usage

Install : `npm install`

Run : `npm start`

Access `localhost:5000/{owner}/{repo}` 

### Example

Google's GSON (https://github.com/google/gson) : 

`localhost:5000/google/gson`

will return :

    {     
     "watchers": "676",
     "stars": "12328",
     "forks": "2597",
     "issues": "272",
     "pullRequests": "64",
     "commits": "1394",
     "branches": "13",
     "releases": "36",
     "contributors": "76",
     "license": "Apache-2.0"
     }

_Data as of April 21st 2018._

### Disclaimer

This was done to demonstrate powers of phantomjs together with express & jQuery, not as an encouragement to mass-web-crawl.
Please use with reasonable usage within Github limits.   