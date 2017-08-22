function exportNotes() {
    saveOptions();
    var saveDirValue = document.getElementById('saveDir').value;
    var cssClassSelectorValue = document.getElementById('cssClassSelector').value;
    var fileExt = '/issues.txt";';
    if (saveDirValue.endsWith("/")) {
        fileExt = 'issues.txt";';
    }
    chrome.tabs.executeScript({
        code: 'var saveDir = "' + saveDirValue + fileExt + ' var cssClassSelector = "' + cssClassSelectorValue + '"'
    }, function () {
        chrome.tabs.executeScript({ file: 'main.js' });
    });
}

function saveOptions() {
    var saveDirValue = document.getElementById('saveDir').value;
    var cssClassSelectorValue = document.getElementById('cssClassSelector').value;

    chrome.storage.sync.set({
        saveDir: saveDirValue,
        cssClassSelector: cssClassSelectorValue
    }, function () {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 2000);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        saveDir: '/Users/amiorkov/Downloads',
        cssClassSelector: 'link-gray-dark no-underline h4 js-navigation-open'
    }, function (items) {
        document.getElementById('saveDir').value = items.saveDir;
        document.getElementById('cssClassSelector').value = items.cssClassSelector;
    });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.status) {
            var status = document.getElementById('exportStatus');
            status.textContent = request.status;
        }
    });

restoreOptions();

document.getElementById('exportButton').addEventListener('click', exportNotes);