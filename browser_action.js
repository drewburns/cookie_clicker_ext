// function onlyUnique(value, index, self) {
//     return self.indexOf(value) === index;
// }
// alert("yolo")
// $('#cookieCount').text("TEST");
// chrome.storage.sync.set({ linkList: [] }, function () {});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

chrome.storage.sync.get(["linkList"], function (items) {
  try {
    // load links
    $("#newLink").click(() => {
      chrome.storage.sync.get(["linkList"], function (items2) {
        const nameInput = $("#newName");
        const urlInput = $("#newURL");

        const newId = makeid(7);
        const newLink = {
          id: newId,
          name: nameInput.val(),
          url: urlInput.val(),
        };
        const newList = items2.linkList
          ? items2.linkList.concat(newLink)
          : [newLink];
        chrome.storage.sync.set({ linkList: newList }, function () {
          $("#link-list").prepend(
            `<li id=${newId}><h5><b>${nameInput.val()}</b>: ${urlInput.val()}</h5><div id=${
              "del_" + newId
            } type="button" class="btn btn-danger">Delete</div></li>`
          );
          $(`#del_${newId}`).click(() => {
            removeLink(newId);
          });
          nameInput.val("");
          urlInput.val("");
        });
      });

      //   alert("heelo!");
    });
    items.linkList.forEach((item) => {
      $("#link-list").append(
        `<li id=${item.id}><h5><b>${item.name}</b>: ${item.url}</h5> <button id=${
          "del_" + item.id
        } type="button" class="btn btn-danger" >Delete</button></li>`
      );

      $(`#del_${item.id}`).click(() => {
        removeLink(item.id);
        // alert(`clicked: ${item.id}`);
      });
    });
  } catch (err) {
    // alert(err);
  }
});

const removeLink = (id) => {
  chrome.storage.sync.get(["linkList"], function (items) {
    const newItems = items.linkList.filter((i) => i.id !== id);
    chrome.storage.sync.set({ linkList: newItems }, function () {});
    $(`#${id}`).remove();
  });
};