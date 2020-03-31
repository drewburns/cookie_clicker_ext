# Cookie Clicker Extension
[Link to download](https://chrome.google.com/webstore/detail/cookie-clicker/fddoklbbncbclomgdaikpjnlejjlppdb) 

### Introduction
This is a chrome extension that automatically clicks cookies for you. It keeps track of the list of sites you've accepted. It does this using jQuery finds.
__________
### Installation Guide
1) Pull Repo
2) Go to chrome://extensions
3) Click load unpacked and select the folder of the repo


### Guide for editing
The three main files to edit are 

1) contentScript.js
- This file is what runs on every website
- Finds a div with the words "use cookies" in it
- Then searched that div for a link or button with "Accept" or "OK" to click
- Clicks it and then saves that record that you've accepted

2) popup.html
- This is simply the HTML file the popup

3) browser_action.js
- Loads in the number you've clicked



### To do
- Make it more efficient (Back off algorithm, store visited sites, etc?)
-