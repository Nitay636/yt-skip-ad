let adHandlingInProgress = false;

function adExists() {
  const videoAd = document.querySelector(".video-ads");
  console.log("videoAd exists:", videoAd !== null);
  return videoAd !== null;
}

function checkAndSkipAdOnce() {
  if (adHandlingInProgress) return;
  adHandlingInProgress = true;

  const videoContainer = document.querySelector(".video-stream");

  const interval = setInterval(() => {
    const videoAd = document.querySelector(".video-ads");
    if (
      videoAd &&
      videoAd.offsetParent !== null && // element is not `display: none`
      videoAd.getBoundingClientRect().height > 0 // element takes up space
    ) {
      console.log("Ad detected, skipped 10 seconds");
      videoContainer.currentTime += 10;
      clearInterval(interval);
      adHandlingInProgress = false;

      // Let user press the enlarged skip button manually
      const skipButton =
        document.querySelector(".ytp-skip-ad-button") ||
        document.querySelector("#ytp-skip-ad-button");

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
    } else {
      clearInterval(interval);
      adHandlingInProgress = false;
    }
  }, 100);
}

if (location.hostname === "www.youtube.com") {
  setInterval(() => {
    console.log("Checking for ads...");
    if (adExists()) {
      checkAndSkipAdOnce();
    }
  }, 1000);
}
