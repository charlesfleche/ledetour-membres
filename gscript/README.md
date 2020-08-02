# json-membres-public

This is a Google Apps Script that reads user data from a Google Sheet and exports a JSON file. The script is hosted by Google and is published as "Deploy as web app". It runs everytime a get request is made to the published URL.

# Change log
- 15 Nov 2019 - json now includes hours for all family members.

## Development Environment

- If you have access to the script, it should be visible from https://script.google.com/home/all
- All development can happen in the browser using the Google Apps Script IDE.
- I used [clasp](https://developers.google.com/apps-script/guides/clasp) to develop the script in my local machine but all files are pushed and hosted in Google's Script servers.
- Once the code is pushed to Google using clasp, the file extenssions change from .js to .gs.
