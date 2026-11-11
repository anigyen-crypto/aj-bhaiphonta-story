const progressBar = document.getElementById("progressBar");
const toast = document.getElementById("toast");

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}

async function copyPageLink() {
  const url = window.location.href;
  try {
    await navigator.clipboard.writeText(url);
    showToast("ওয়েবসাইটের লিংক কপি হয়েছে");
  } catch {
    showToast("ব্রাউজারের Address Bar থেকে লিংক কপি করুন");
  }
}

document.getElementById("copyButton").addEventListener("click", copyPageLink);

document.getElementById("shareButton").addEventListener("click", async () => {
  const shareData = {
    title: "আজ ভাইফোঁটা...",
    text: "কিছু অপেক্ষা, কিছু প্রতিশ্রুতি, আর কিছু না বলা অভিমানের গল্প।",
    url: window.location.href
  };
  if (navigator.share) {
    try { await navigator.share(shareData); }
    catch (error) { if (error.name !== "AbortError") copyPageLink(); }
  } else {
    copyPageLink();
  }
});
