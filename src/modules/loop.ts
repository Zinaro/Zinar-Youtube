// src/modules/loop.ts
let startTime: number | null = null;
let endTime: number | null = null;
let isActive = false;

const video = document.querySelector('video') as HTMLVideoElement;
const progressBar = document.querySelector('.ytp-progress-bar') as HTMLElement;

export const getVideo = () => video;

export const setIsActive = (active: boolean) => {
  isActive = active;
};

export const setStartTime = (time: number | null) => {
  startTime = time;
};

export const setEndTime = (time: number | null) => {
  endTime = time;
};

export const getIsActive = () => isActive;
export const getStartTime = () => startTime;
export const getEndTime = () => endTime;

export const clearMarkers = (): void => {
  const existingMarkers: NodeListOf<HTMLElement> = document.querySelectorAll('.zinar-marker');
  existingMarkers.forEach(marker => marker.remove());
  setStartTime(null);
  setEndTime(null);
};

export const createMarker = (position: number, label: string, backgroundColor: string): HTMLElement => {
    const marker = document.createElement('div');
    marker.classList.add('zinar-marker');
    marker.style.position = 'absolute';
    marker.style.left = `${position}%`;
    marker.style.top = '-25px';
    marker.style.transform = 'translateX(-50%)';
    marker.style.zIndex = '10000';
    marker.style.textAlign = 'center';

    const text = document.createElement('div');
    text.textContent = label;
    text.style.color = 'white';
    text.style.fontSize = '12px';
    text.style.fontWeight = 'bold';
    text.style.backgroundColor = backgroundColor;
    text.style.padding = '4px 8px';
    text.style.borderRadius = '5px';
    text.style.marginBottom = '5px';

    marker.appendChild(text);

    const line = document.createElement('div');
    line.style.width = '4px';
    line.style.height = '20px';
    line.style.backgroundColor = backgroundColor;
    line.style.margin = '0 auto';

    marker.appendChild(line);

    return marker;
}
export const createStopButton = (): HTMLElement => {
    const stopButton = document.createElement('div');
    stopButton.textContent = 'Stop Loop';
    Object.assign(stopButton.style, {
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: '#ff4d4d',
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
        padding: '8px 12px',
        borderRadius: '20px',
        cursor: 'pointer',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: '10001',
    });
    const videoContainer = video.parentElement as HTMLElement;
    videoContainer.style.position = 'relative';
    videoContainer.appendChild(stopButton);
    const updateButtonPosition = () => {
        stopButton.style.top = document.fullscreenElement ? '70px' : '10px';
    };
    document.addEventListener('fullscreenchange', updateButtonPosition);
    stopButton.addEventListener('click', (event) => {
        event.stopPropagation();
        isActive = false;
        clearMarkers();
        video.pause();
        stopButton.remove();
    });
    return stopButton;
};

export const startLoop = (): void => {
    if (startTime !== null && endTime !== null && video instanceof HTMLVideoElement) {
        const validStartTime = startTime;
        const validEndTime = endTime;
        const checkLoop = (): void => {
            if (!isActive) return;
            if (video.currentTime >= validEndTime) {
                video.currentTime = validStartTime;
                video.play();
            }
            requestAnimationFrame(checkLoop);
        };
        video.play();
        checkLoop();
    }
}



const handleProgressBarClick = (event: MouseEvent) => {
    if (!getIsActive()) return;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickPosition = (clickX / progressBar.offsetWidth) * 100;
    const currentTime = (clickPosition / 100) * video.duration;
  
    if (!startTime) {
      setStartTime(currentTime);
      progressBar.appendChild(createMarker(clickPosition, 'Destpêk', 'green'));
    } else if (!endTime) {
      setEndTime(currentTime);
      progressBar.appendChild(createMarker(clickPosition, 'Dawî', 'red'));
      startLoop();
    } else {
      clearMarkers();
      setStartTime(currentTime);
      setEndTime(null);
      progressBar.appendChild(createMarker(clickPosition, 'Destpêk', 'green'));
    }
  };
  
  export const initializeVideoLoopHandlers = () => {
    progressBar.addEventListener('click', handleProgressBarClick);
  };