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

function getBackgroundImg(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: "getPageInfo.js"});
    });
}

chrome.runtime.onConnect.addListener(function(port) {
    if(port.name!= "start"){
        port.onMessage.addListener(function(msg) {
            document.getElementById("commentsCounter").innerHTML = msg.commentsCount;
            if (msg.message == "finished"){
                document.getElementById("loadcomments").innerHTML = "Comments uploaded";
                innerHTMLs = JSON.parse(msg.comments);
            }
    
        });
    } else {
        port.onMessage.addListener(function(msg) {
            console.log(msg.imgLink);
            console.log($("body").css('background'));
            document.body.style.backgroundImage = "url('" + msg.imgLink + "')";
        })
    }
    
  });

$('#loadcomments').on('click', injectTheScript);
$('#learnWinners').click( function(){
    document.getElementById("singleWinner").innerHTML = innerHTMLs[randomInteger(1, innerHTMLs.length)];
    $("a[href]").each(function()
    { 
       this.href = this.href.replace("chrome-extension://"+ this.hostname,"https://www.instagram.com");
    });
});

//Open links in new tab
$(document).ready(function(){
    getBackgroundImg();
    $('body').on('click', 'a', function(){
      chrome.tabs.create({url: $(this).attr('href')});
      return false;
    });
 });