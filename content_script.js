function clickLoadMoreComments() {
    var loadMoreCommentsButton = document.getElementsByClassName("_m3m1c _1s3cd")[0];
    var timerId = setTimeout(function clickAgain() {
        if (document.body.contains(loadMoreCommentsButton)){
        loadMoreCommentsButton.click();
        }
        timerId = setTimeout(clickAgain, 1000);
      }, 1000);
}
clickLoadMoreComments();