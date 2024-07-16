document.addEventListener("DOMContentLoaded", function () {
  const stepInput = document.getElementById("step");
  const speedInput = document.getElementById("speed");
  const stepValue = document.getElementById("stepValue");
  const speedValue = document.getElementById("speedValue");

  chrome.storage.sync.get(["speed", "step"], function (data) {
    if (data.speed !== undefined) {
      speedInput.value = data.speed;
      speedValue.textContent = data.speed;
    }
    if (data.step !== undefined) {
      stepInput.value = data.step;
      stepValue.textContent = data.step;
      speedInput.step = data.step;
    }
  });

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const updateSettings = debounce(function () {
    const step = parseFloat(stepInput.value);
    const speed = parseFloat(speedInput.value);

    chrome.storage.sync.set({ speed, step }, function () {
      speedInput.step = step;
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach((tab) => {
          chrome.scripting
            .executeScript({
              target: { tabId: tab.id },
              func: setVideoSpeed,
              args: [speed],
            })
            .catch((err) => console.error(err));
        });
      });
    });
  }, 200);

  function setVideoSpeed(speed) {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.playbackRate = speed;
    });
  }

  stepInput.addEventListener("input", function () {
    stepValue.textContent = stepInput.value;
    updateSettings();
  });

  speedInput.addEventListener("input", function () {
    speedValue.textContent = speedInput.value;
    updateSettings();
  });
});
