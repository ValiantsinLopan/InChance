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

port.onMessage.addListener(function(msg) {
    if (msg.message == "getWinner")
        alert("lol");
  });
clickLoadMoreComments();