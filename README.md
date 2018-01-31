# Chrome extension 'UI for {N} Release notes export'

## Purpose
This extension is useful when you want to:
- Created release notes of your private reposotiry issues (by using their titles) 
- And also want to add a link to the same issue but from a public reposiotry (compared by title)
Useful for scenarios where your code is in a private repo and you also have a public repo where users report you issues. After that you make a copy of the same issue in your private repository to be able to keep track of it and close it. When you want to create a release notes from those internal issues that are closed this tool will autoamtically export a markdown list of each visible issue on the page, find hte "original" issue in the publci reposiotry and add it as "#number" link on the end of each release note.

## How it works
This extension simply export the currently visible titles the issues on the page from a predefined github repository. It is also possible to match the exact copy of the issue (by title) to a second "public" reposotiry and add it as a link to the "release notes" for that issue.

## How to use the extension
1. Go to the Pro UI repository and filter for specific milestone or any criteria
2. Press the extension icon in the task bar
3. Press 'Export'",
