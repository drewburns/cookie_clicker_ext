// function onlyUnique(value, index, self) { 
//     return self.indexOf(value) === index;
// }

chrome.storage.sync.get(["cookieList"], function (items) {
    console.log(items);
    try {
        $('#cookieCount').text(items.cookieList.length);
    }catch(err) {
        $('#cookieCount').text("0");
    }
});