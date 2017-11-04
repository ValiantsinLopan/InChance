function injectTheScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"});
        
    });
}
chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        alert(msg.commentsCount);
    });
  });
  
document.getElementById('loadcomments').addEventListener('click', injectTheScript);
