// ✅ Auto popup on refresh
window.onload = function () {
    // Show welcome popup
    document.getElementById("welcomePopup").style.display = "block";

    // Load stored view/download counts for specific blog/app IDs
    let ids = ["vpn", "app1", "app2", "app3", "app4", "app5"]; // Add more IDs here
    ids.forEach((id) => {
        let views = localStorage.getItem(`view_${id}`) || 0;
        let downloads = localStorage.getItem(`download_${id}`) || 0;

        let viewElement = document.getElementById(`view-count-${id}`);
        let downloadElement = document.getElementById(`download-count-${id}`);

        if (viewElement) viewElement.innerText = `Views: ${views}`;
        if (downloadElement) downloadElement.innerText = `Downloads: ${downloads}`;
    });

    // Optional: Fake View Boost for app cards (1–5)
    for (let i = 1; i <= 5; i++) {
        let viewEl = document.getElementById(`viewCount${i}`);
        if (viewEl) {
            let currentViews = parseInt(viewEl.innerText);
            viewEl.innerText = currentViews + Math.floor(Math.random() * 50 + 1);
        }
    }
};
// ✅ Close Welcome Popup
function closeWelcomePopup() {
  const popup = document.getElementById("welcomePopup");
  if (popup) {
    popup.style.display = "none";
  }
}

// ✅ Count Views & Downloads for Blog (e.g., vpn)
function incrementCounter(id) {
  let viewKey = `view_${id}`;
  let downloadKey = `download_${id}`;

  let views = parseInt(localStorage.getItem(viewKey)) || 0;
  let downloads = parseInt(localStorage.getItem(downloadKey)) || 0;

  views++;
  downloads++;

  localStorage.setItem(viewKey, views);
  localStorage.setItem(downloadKey, downloads);

  let viewElement = document.getElementById(`view-count-${id}`);
  let downloadElement = document.getElementById(`download-count-${id}`);

  if (viewElement) viewElement.innerText = `Views: ${views}`;
  if (downloadElement) downloadElement.innerText = `Downloads: ${downloads}`;
}

// ✅ Handle Public Upload Form
const publicForm = document.getElementById("publicUploadForm");
if (publicForm) {
  publicForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const status = document.getElementById("uploadStatus");
    if (status) status.textContent = "✔️ App uploaded successfully! (Demo)";
    this.reset();
  });
}

// ✅ Handle Admin Upload Form
const adminForm = document.getElementById("adminUploadForm");
if (adminForm) {
  adminForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("✅ Admin Upload Successful (Demo)");
    this.reset();
  });
}

// ✅ Preloader + Welcome + View Boost + View/Download Load
window.addEventListener("load", function () {
  // Hide Preloader
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.style.display = "none";

  // Show Welcome Popup
  const popup = document.getElementById("welcomePopup");
  if (popup) popup.style.display = "block";

  // Load blog view/download data
  let blogIds = ["vpn"];
  blogIds.forEach((id) => {
    let views = parseInt(localStorage.getItem(`view_${id}`)) || 0;
    let downloads = parseInt(localStorage.getItem(`download_${id}`)) || 0;

    const viewElement = document.getElementById(`view-count-${id}`);
    const downloadElement = document.getElementById(`download-count-${id}`);

    if (viewElement) viewElement.innerText = `Views: ${views}`;
    if (downloadElement) downloadElement.innerText = `Downloads: ${downloads}`;
  });

  // Load app views (app1 to app5)
  for (let i = 1; i <= 5; i++) {
    const viewEl = document.getElementById(`viewCount${i}`);
    if (viewEl) {
      let currentViews = parseInt(viewEl.innerText) || 0;
      viewEl.innerText = currentViews + Math.floor(Math.random() * 50 + 1);
    }
  }
});
// ✅ Prevent multiple countdowns + smoother UX
let activeTimers = {};

function startDownloadTimer(id, url) {
  if (activeTimers[id]) return; // Already running, ignore further clicks

  const timer = document.getElementById(`timer${id}`);
  const countdown = document.getElementById(`countdown${id}`);
  const downloadBtn = document.getElementById(`downloadBtn${id}`);

  // Mark this timer as active
  activeTimers[id] = true;

  let seconds = 5;
  timer.style.display = "block";
  countdown.innerText = seconds;
  downloadBtn.innerText = "⏳ Downloading...";

  const interval = setInterval(() => {
    seconds--;
    countdown.innerText = seconds;

    if (seconds <= 0) {
      clearInterval(interval);
      timer.innerHTML = `<a href="${url}" class="download-btn" target="_blank">✅ Click to Download</a>`;
      downloadBtn.innerText = "⬇ Download";
      activeTimers[id] = false;

      // Count the download
      incrementCounter(`app${id}`);
    }
  }, 1000);
}

// ✅ Start Download Countdown with real URL
function startDownloadTimer(id, url) {
  const timer = document.getElementById(`timer${id}`);
  const countdown = document.getElementById(`countdown${id}`);
  const downloadBtn = document.getElementById(`downloadBtn${id}`);

  let seconds = 5;
  timer.style.display = "block";
  countdown.innerText = seconds;

  const interval = setInterval(() => {
    seconds--;
    countdown.innerText = seconds;
    if (seconds <= 0) {
      clearInterval(interval);
      timer.innerHTML = `<a href="${url}" class="download-btn" target="_blank">✅ Click to Download</a>`;

      // Optional Auto Redirect:
      // window.location.href = url;

      // ✅ Count Download
      incrementCounter(`app${id}`);
    }
  }, 1000);
}
// Contact Form Submit (Demo)
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("contactStatus").textContent = "✅ Message sent successfully! (Demo)";
  this.reset();
});
document.getElementById("adminDashboardForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("dashUploadStatus").textContent = "✅ App uploaded successfully! (Demo)";
  this.reset();
});
