var port = chrome.runtime.connect({name: "start"});
var pageUrl = window.location.href; 
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getPageInfo(){
    if (pageUrl.includes("https://www.instagram.com/p")){
        var link = getElementByXpath("//div[contains(@class, '_sxolz')]//img[@class='_2di5p']");
        var accountNameString = document.getElementsByClassName('_2g7d5 notranslate _iadoq')[0].textContent;
        port.postMessage({
            url: pageUrl.toString(),
            accountName: accountNameString,
            imgLink: link.src.toString()
        })
    } else {
        port.postMessage({
            url: pageUrl.toString(),
            imgLink: ""
        })
    }
    
}
getPageInfo();