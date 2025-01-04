// src/popup/popup.ts

function sendMessageToContentScript(command: string): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id;
        if (tabId) {
            chrome.tabs.sendMessage(tabId, { command });
        } else {
            console.error("Nehat Dîtin");
        }
    });
}

const startButton = document.getElementById('start-button') as HTMLButtonElement;
const stopButton = document.getElementById('stop-button') as HTMLButtonElement;

startButton?.addEventListener('click', () => {
    sendMessageToContentScript('start');
});

stopButton?.addEventListener('click', () => {
    sendMessageToContentScript('stop');
});
