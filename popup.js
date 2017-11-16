var innerHTMLs = new Array();

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

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
            innerHTMLs = JSON.parse(msg.comments);
        }

    });
  });

$('#loadcomments').on('click', injectTheScript);
$('#getSingleWinner').click( function(){
    document.getElementById("singleWinner").innerHTML = innerHTMLs[randomInteger(1, innerHTMLs.length)];
    console.log(document.getElementsByClassName('_2g7d5').href);
});