function injectTheScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"});
    });
}

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        document.getElementById("commentsCounter").innerHTML = msg.commentsCount;
        if (msg.message == "finished"){
            document.getElementById("loadcomments").innerHTML = "Comments uploaded";
        }

    });
  });

document.getElementById('loadcomments').addEventListener('click', injectTheScript);