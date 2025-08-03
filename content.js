function ad() {
  const videoContainer = document.querySelector(".video-stream");

  console.log("Ad detected, skipping...");
  if (videoContainer) {
    videoContainer.currentTime += 10; // Skip 10 seconds
  }
}

function adExists() {
  const videoAd = document.querySelector(".video-ads");
  console.log("videoAd exists:", videoAd !== null);
  return videoAd !== null;
}

function checkAndSkipAdOnce() {
  const videoContainer = document.querySelector(".video-stream");

  const interval = setInterval(() => {
    const videoAd = document.querySelector(".video-ads");
    if (videoAd) {
      console.log("Ad detected, skipping 10 seconds");
      videoContainer.currentTime += 10;
      clearInterval(interval);

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
    }
  }, 100);
}

if (location.hostname === "www.youtube.com") {
  console.log("Inside youtube website");

  setInterval(() => {
    if (adExists()) {
      checkAndSkipAdOnce();
    }
  }, 1000);
}
