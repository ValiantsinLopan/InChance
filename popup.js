var innerHTMLs = new Array();

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len){
        n=len;
    }
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}

function markedUsersIn(str){
    var reg = /@(\w+)/gm;
    var matches = str.match(reg);
    return new Array(matches);
}

function getСontenders(){
    var markedCount = document.getElementById("marked").value;
    var contentString = document.getElementById("textarea").value;
    console.log(markedCount);
    console.log(contentString);
    console.log(innerHTMLs);
    var contenders = new Array();

    innerHTMLs.forEach(function(item, i, arr) {
        console.log(markedUsersIn(item)[0]);
        if (markedCount > 0){
            if (markedUsersIn(item)[0] != null && markedUsersIn(item)[0].length >= markedCount && item.includes(contentString)){
                contenders.push(item);
            }
        }
        else {
            if (item.includes(contentString)){
                contenders.push(item);
            }
        }
    });
    return contenders;    
}

function createWinnersUl(winners){
    var list = document.createElement('ul');
    for(var i = 0; i < winners.length; i++) {
        var item = document.createElement('li');
        item.innerHTML = winners[i];
        list.appendChild(item);
    }
    return list;
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
    var winnersCount = document.getElementById("winnersCount").value;
    var winners = getRandom(getСontenders(), winnersCount);     
    document.getElementById("winners").appendChild(createWinnersUl(winners));
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
