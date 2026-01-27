document.addEventListener("DOMContentLoaded", function () {
    // venobox (이미지/비디오 등)
    if (typeof $.fn.venobox !== "undefined") {
      $(".venobox").venobox({
        spinner: "cube-grid",
        spinColor: "#666",
        autoplay: true,
      });
    }
  });
  
  /**
   * Publication video modal opener (works for both BS4/BS5)
   * Usage:
   *  onclick="openPubVideoModal('vid-KEY', 'VIDEO_URL')"
   */
  window.openPubVideoModal = function (modalId, videoSrc) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
  
    const player = modal.querySelector("video.pub-video-player");
    if (!player) return;
  
    // set source
    player.src = videoSrc;
    player.load();
  
    // open modal (BS5 preferred, fallback BS4)
    if (window.bootstrap && window.bootstrap.Modal) {
      const m = window.bootstrap.Modal.getOrCreateInstance(modal);
      m.show();
    } else if (window.$ && typeof $(modal).modal === "function") {
      $(modal).modal("show");
    }
  
    // autoplay (some browsers may block if not muted)
    player.play().catch(() => {});
  };
  
  // stop & cleanup on close (BS5 event / BS4 event both use this name)
  document.addEventListener("hidden.bs.modal", function (e) {
    const modal = e.target;
    if (!modal.classList.contains("pub-video-modal")) return;
  
    const player = modal.querySelector("video.pub-video-player");
    if (!player) return;
  
    player.pause();
    player.removeAttribute("src");
    player.load();
  });


document.addEventListener("click", (e) => {
    const v = e.target.closest("video");
    if (v) console.log("VIDEO CLICKED", v.className);
});