var port = chrome.runtime.connect();
var comments = document.getElementsByClassName("_ezgzd");

function clickLoadMoreComments() {
    var loadMoreCommentsButton = document.getElementsByClassName("_m3m1c _1s3cd")[0];
    var timerId = setTimeout(function clickAgain() {
        if (document.body.contains(loadMoreCommentsButton)){
        loadMoreCommentsButton.click();
        port.postMessage({commentsCount: 
            (document.getElementsByClassName("_ezgzd").length-1).toString()});
        }
        timerId = setTimeout(clickAgain, 1000);
        if (!document.body.contains(loadMoreCommentsButton)){
            clearTimeout(timerId);
            port.postMessage(
                {
                    commentsCount: (comments.length-1).toString()+" comments founded!",
                    message : "finished",
                    comments : JSON.stringify(Array.from(comments).map(a => a.innerHTML), null, '\t')
                }
            );
        }
      });
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
function getRandomComment(){
    var commentsCount = comments.length - 1;
    var randomCommentIndex = randomInteger(1, commentsCount);
    return comments[randomCommentIndex];
}
function getCommentsOnJSON(){
    var innerHtmls = Array.from(comments).map(a => a.innerHTML);
    var str = JSON.stringify(innerHtmls);
}

port.onMessage.addListener(function(msg) {
    if (msg.message == "getWinner")
        alert("lol");
  });
clickLoadMoreComments();