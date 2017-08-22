var elementCssClass = cssClassSelector;

(function (console) {

    console.save = function (data, filename) {

        if (!data) {
            console.log('No data to export, make sure you are at the right web page ( https://github.com/telerik/nativescript-ui-feedback/issues )')
            sendMessageToExtensionPopup("Error, see console log!");
            
            return;
        }

        var blob = new Blob([data], { type: 'text/plain' }),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function getFeedbackItem(searchTerm) {
    var feedBackSearchURI = "https://github.com/telerik/nativescript-ui-feedback/issues?utf8=%E2%9C%93&q=" + searchTerm;

    var html = httpGet(feedBackSearchURI);
    var el = document.createElement('html');
    el.innerHTML = html;
    var issues = el.getElementsByClassName(elementCssClass);
    var data = "";
    for (var i = 0; i < issues.length; i++) {
        var issueNumber = issues[i].href.substr(issues[i].href.lastIndexOf("/") + 1, issues[i].href.length);
        data += "- " + issues[i].text.trim() + " ([#" + issueNumber + "](" + issues[i].href + "))\n";
        return data;
    }
}

function exportReleaseNotes() {
    var issues = document.getElementsByClassName(elementCssClass);
    var data = "";

    sendMessageToExtensionPopup("Exporting");

    for (var i = 0; i < issues.length; i++) {
        var issueNumber = issues[i].href.substr(issues[i].href.lastIndexOf("/") + 1, issues[i].href.length);
        var issueTitle = issues[i].text.trim();
        var feedbackItem = getFeedbackItem(issueTitle);
        if (feedbackItem) {
            data += feedbackItem;
        } else {
            data += "- " + issueTitle + "\n";
        }
    }

    sendMessageToExtensionPopup("Done");
    
    console.save(data, [saveDir])
}

function sendMessageToExtensionPopup(message) {
    chrome.runtime.sendMessage({ status: message });
}

exportReleaseNotes();