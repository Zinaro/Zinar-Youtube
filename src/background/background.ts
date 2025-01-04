
chrome.action.onClicked.addListener((tab) => {
    if (tab.id !== undefined) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                chrome.runtime.sendMessage({ command: 'start' });
            },
        });
    } 
});
