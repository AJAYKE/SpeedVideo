chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ speed: 1.0, step: 0.1 });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && tab.url.startsWith("http")) {
      chrome.storage.sync.get("speed", (data) => {
        chrome.scripting
          .executeScript({
            target: { tabId: activeInfo.tabId },
            func: setVideoSpeed,
            args: [data.speed],
          })
          .catch((err) => console.error(err));
      });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.startsWith("http")
  ) {
    chrome.storage.sync.get("speed", (data) => {
      chrome.scripting
        .executeScript({
          target: { tabId: tabId },
          func: setVideoSpeed,
          args: [data.speed],
        })
        .catch((err) => console.error(err));
    });
  }
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "sync" && changes.speed) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url && tabs[0].url.startsWith("http")) {
        chrome.scripting
          .executeScript({
            target: { tabId: tabs[0].id },
            func: setVideoSpeed,
            args: [changes.speed.newValue],
          })
          .catch((err) => console.error(err));
      }
    });
  }
});

function setVideoSpeed(speed) {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.playbackRate = speed;
  });
}
