function checkForAd(videoAd) {
  // Check if the ad is visible
  if (
    videoAd &&
    videoAd.offsetParent !== null && // element is not `display: none`
    videoAd.getBoundingClientRect().height > 0 // element takes up space
  ) {
    return true;
  }
  return false;
}

function skipAd() {
  // Skip the ad by increasing the current time of the video
  const videoContainer = document.querySelector(".video-stream");
  const videoAd = document.querySelector(".video-ads");

  if (
    videoAd &&
    videoAd.offsetParent !== null && // element is not `display: none`
    videoAd.getBoundingClientRect().height > 0 // element takes up space
  ) {
    if (videoContainer.currentTime < 30) {
      videoContainer.currentTime += 30; // Skip 30 seconds, enough for even ads which very long with no skip button
    }
    videoContainer.pause();
  }
}

function enlargeSkipButton() {
  // Enlarge the skip button to make it more clickable
  const skipButton =
    document.querySelector(".ytp-skip-ad-button") ||
    document.querySelector("#ytp-skip-ad-button");

  if (!skipButton) {
    console.warn("Skip button not found");
    console.warn("Skip button not found");
    return false;
  }
  if (skipButton && skipButton.offsetParent !== null) {
    Object.assign(skipButton.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      opacity: "0.01",
      zIndex: "9999",
      pointerEvents: "auto",
    });
  }
}

function startObserver() {
  if (location.hostname === "www.youtube.com") {
    let throttleTimeout;
    const throttleDelay = 100; // 100 ms
    const observer = new MutationObserver((mutations) => {
      if (throttleTimeout) return; // Skip if already waiting
      throttleTimeout = window.setTimeout(() => {
        throttleTimeout = null;

        for (const mutation of mutations) {
          if (mutation.type === "childList") {
            const videoAd = document.querySelector(".video-ads");
            if (checkForAd(videoAd)) {
              skipAd();
              if (enlargeSkipButton()) {
              }
            } else if (!checkForAd(videoAd)) {
            }
          }
        }
      }, throttleDelay);
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}
if (document.body) {
  startObserver();
} else {
  window.addEventListener("DOMContentLoaded", startObserver);
}
