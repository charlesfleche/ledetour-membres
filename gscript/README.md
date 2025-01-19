# json-membres-public

This is a Google Apps Script that reads user data from a Google Sheet and exports a JSON file. The script is hosted by Google and is published as "Deploy as web app". It runs everytime a get request is made to the published URL.

# Change log
- 19 Jan 2025 - private data (at cash) doesn't display member hours, hours can only be viewed via the public data
- 7 Aug 2021 - indi and fam hours are now taken from "VRAI" columns AD and AE.
- 15 Nov 2019 - json now includes hours for all family members.

## Development Environment

- If you have access to the script, it should be visible from https://script.google.com/home/all
- All development can happen in the browser using the Google Apps Script IDE.
- I used [clasp](https://developers.google.com/apps-script/guides/clasp) to develop the script in my local machine but all files are pushed and hosted in Google's Script servers.
- Once the code is pushed to Google using clasp, the file extensions change from .js to .gs.

## Local setup
- To run the app it will require a JSON file to parse in order to display any data. 
  - Copy the data from the live public version of the app by navigating to https://membres.epicerieledetour.org/members.json. 
  - The <code>members.json</code> file must be saved locally in the project's 'src' folder.
- In order to run a local server use python, in the terminal:
<code> python3 -m http.server </code>
- While the server is running you can find the app at <code>localhost:8000</code> in your browser.

