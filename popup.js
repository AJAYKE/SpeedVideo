document.addEventListener("DOMContentLoaded", function () {
  const speedRange = document.getElementById("speedRange");
  const speedValue = document.getElementById("speedValue");

  chrome.storage.sync.get("speed", (data) => {
    speedRange.value = data.speed;
    speedValue.textContent = `${data.speed}x`;
  });

  speedRange.addEventListener("input", function () {
    const speed = speedRange.value;
    speedValue.textContent = `${speed}x`;
    chrome.storage.sync.set({ speed: parseFloat(speed) });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: setVideoSpeed,
        args: [parseFloat(speed)],
      });
    });
  });

  function setVideoSpeed(speed) {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.playbackRate = speed;
    });

    new MutationObserver(() => {
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        video.playbackRate = speed;
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
});
