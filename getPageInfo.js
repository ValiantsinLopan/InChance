var port = chrome.runtime.connect({name: "start"});
var link = getElementByXpath("//div[contains(@class, '_sxolz')]//img[@class='_2di5p']");
var accountNameString = document.getElementsByClassName('_2g7d5 notranslate _iadoq')[0].textContent;
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }
function getBackgroundImg(){
    port.postMessage({
        accountName: accountNameString,
        imgLink: link.src.toString()
    })
}
getBackgroundImg();