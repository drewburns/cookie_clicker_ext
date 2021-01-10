(function() {
      var observer = new MutationObserver(function (mutations) {
        chrome.storage.sync.get(["linkList"], function (items) {
          if (document.querySelectorAll('[role="group"]')[0]) {
            var savedRange = null;
            document.addEventListener("selectionchange", () => {
              var sel = window.getSelection && window.getSelection();
              if (sel && sel.rangeCount > 0) {
                  savedRange = sel.getRangeAt(0);
              }
            }, false);

            //   openDiscord();

            const formatAreas = document.querySelectorAll('[role="group"]');
            formatAreas.forEach((formatArea) => {
              if (
                formatArea.id &&
                !formatArea.getAttribute("link_holster_set")
              ) {
                const textBox = formatArea.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll(
                  '[role="textbox"]'
                )[0];
                textBox.setAttribute("link_holster_set", true);
                // console.log("text box: ", textBox);
                var area = document.createElement("div");
                area.style.height = "35px";
                area.style.minWidth = "500px";
                area.style.backgroundColor = "grey";
                area.style.textAlign = "center";
                // area.style.position = "absolute";
                const randID = Math.random()
                  .toString(36)
                  .replace(/[^a-z]+/g, "")
                  .substr(0, 6);

                area.innerHTML = `
                <div id=${randID} style="width: 500;padding:5px;height:35px;background-color: #efefef;white-space: nowrap;overflow-x: scroll;border: 1px #999999 solid;">
                  ${items.linkList.length === 0 ? "Add links in extension" : ""}
                </div>`;

                formatArea.prepend(area);
                formatArea.setAttribute("link_holster_set", true);

                items.linkList.forEach((item) => {
                  const itemID = Math.random()
                  .toString(36)
                  .replace(/[^a-z]+/g, "")
                  .substr(0, 6);
                  const newLink = document.createElement("button");
                  newLink.id = itemID;
                  newLink.style.display = "inline-block";
                  newLink.style.marginRight = "3px";
                  newLink.style.marginTop = "1px";
                  newLink.style.border = "0px";
                  newLink.style.whiteSpace = "normal";
                  newLink.style.marginLeft = "3px";
                  newLink.innerHTML = `
                      <div style='min-width:100px;height:35px;background-color:#d3d3d3;border-radius:10px; text-align: center;
                        line-height: 35px;font-size:15px;display:inline-block;overflow:hidden;cursor: pointer;padding-left:7px;padding-right:7px;'>
                        ${item.name}
                      </div>
                  `;
                  document.getElementById(randID).appendChild(newLink);
                  document
                    .getElementById(itemID)
                    .addEventListener("click", () => {
                      var sel = window.getSelection && window.getSelection();
                      if (sel && sel.rangeCount == 0 && savedRange != null) {
                          sel.addRange(savedRange);
                      }
                      if (sel && sel.rangeCount > 0) {
                          // if (savedRange.startContainer.getAttribute("link_holster_set") || savedRange.startContainer.parentElement.getAttribute("link_holster_set")){
                            var range = sel.getRangeAt(0);
                            var node = document.createElement("a");
                            node.href = item.url
                            node.innerText = item.name;
                            range.deleteContents();
                            range.insertNode(node);
                            console.log(savedRange);
                          // }
                      }
                      var range = document.createRange();
                      sel = window.getSelection();
                      range.setStart(textBox.childNodes[textBox.childNodes.length-1],0);
                      range.collapse(true);
                      sel.removeAllRanges();
                      sel.addRange(range);
                      textBox.focus();
                    });
                });
              }
            });
            // observer.disconnect(); // to stop observing the dom
          }
        });
      });

      observer.observe(document.getElementsByTagName("body")[0], {
        childList: true,
        subtree: true, // needed if the node you're targeting is not the direct parent
      });
})();

