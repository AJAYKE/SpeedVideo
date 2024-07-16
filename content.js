function setSpeed(speed) {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.playbackRate = speed;
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.speed !== undefined) {
    setSpeed(message.speed);
  }
});

chrome.storage.sync.get(["speed"], function (data) {
  if (data.speed !== undefined) {
    setSpeed(data.speed);
  }
});
