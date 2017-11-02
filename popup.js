function injectTheScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"});
        
    });
}
chrome.tabs.getSelected()
document.getElementById('loadcomments').addEventListener('click', injectTheScript);

//$(document).ready(function(){
//    $('.btn').text('Текст, для изменения');
//})

    function injectTheScript() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"});
        
        });
    }

    document.getElementById('loadcomments').addEventListener('click', injectTheScript);