setInterval(() => {
  const skipButton =
    document.querySelector(".ytp-skip-ad-button") || // normal button
    document.querySelector("#ytp-skip-ad-button"); // fallback skip div
  const videoContainer = document.querySelector(".html5-video-player");

  if (skipButton && skipButton.offsetParent !== null && videoContainer) {
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
}, 100);
