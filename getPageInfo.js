var port = chrome.runtime.connect({name: "start"});
var link = getElementByXpath("//div[@class='_784q7 _rebbv']//img[@class='_2di5p']");
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }
function getBackgroundImg(){
    port.postMessage({
        imgLink: link.src.toString()
    })
}
getBackgroundImg();