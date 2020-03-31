chrome.storage.sync.get(["cookieList"], function(items) {
  // $('#cookieCount').text(items.cookieList.length);
  try {
    items.cookieList.forEach(website => {
        $("ul").append(`<li><p>${website}</p></li>`); 
    });
  } catch(err) {
    $("ul").append(`<li>None yet</li>`); 
  }
});
