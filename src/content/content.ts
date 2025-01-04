// src/content/content.ts
import { clearMarkers, createStopButton, getIsActive, getVideo, initializeVideoLoopHandlers, setIsActive, startLoop } from '../modules/loop';

initializeVideoLoopHandlers();

chrome.runtime.onMessage.addListener((message: { command: string }) => {
    if (message.command === 'start' && !getIsActive()) {
        setIsActive(true);
        createStopButton();
        startLoop();
    } else if (message.command === 'stop' && getIsActive()) {
        setIsActive(false);
        clearMarkers();
        getVideo().pause();
    }
});