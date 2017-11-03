function injectTheScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"});
        
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      alert(request.commentsCount);
    });
document.getElementById('loadcomments').addEventListener('click', injectTheScript);
