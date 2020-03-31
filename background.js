// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // chrome.storage.sync.get(["cookieCount"], function(count) {
  //   console.log(count);
  // });
  // No tabs or host permissions needed!
  // chrome.tabs.update({
  //   url:
  //     "https://student.studentadmin.uconn.edu/psp/CSPR/EMPLOYEE/HRMS/h/?tab=DEFAULT"
  // });
});
