var innerHTMLs = new Array();
var contentString;
var winnersCount = document.getElementById("winners").value;
var markedCount;

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function markedUsersIn(str){
    var reg = /@(\w+)/gm;
    var matches = str.match(reg);
    return new Array(matches);
}

function getСontenders(){
    contentString = document.getElementById("textarea").value;
    markedCount = document.getElementById("marked").value;
    console.log(markedCount);
    console.log(contentString);
    console.log(innerHTMLs);
    var contenders = new Array();

    innerHTMLs.forEach(function(item, i, arr) {
        if (markedUsersIn(item).length == markedCount){
            contenders.push(item);
        }
    });
    return contenders;    
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
    if(port.name != "start"){
        port.onMessage.addListener(function(msg) {
            document.getElementById("commentsCounter").innerHTML = msg.commentsCount;
            if (msg.message == "finished"){
                document.getElementById("loadcomments").innerHTML = "Comments uploaded";
                innerHTMLs = JSON.parse(msg.comments);
            }
    
        });
    } else {
        port.onMessage.addListener(function(msg) {
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
    console.log(getСontenders());
});

//Open links in new tab
$(document).ready(function(){
    getBackgroundImg();
    $('body').on('click', 'a', function(){
      chrome.tabs.create({url: $(this).attr('href')});
      return false;
    });
 });
