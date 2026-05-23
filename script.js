// スクロール時に要素を控えめに表示するための処理です。
const revealTargets = document.querySelectorAll(".reveal");
const backToTopButton = document.querySelector(".back-to-top");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px"
  });

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  // 古いブラウザでは、アニメーション待ちにせず最初から表示します。
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

// ページを少し下まで読んだら、右下に上へ戻るボタンを表示します。
const updateBackToTop = () => {
  if (!backToTopButton) return;

  backToTopButton.classList.toggle("is-visible", window.scrollY > 420);
};

updateBackToTop();
window.addEventListener("scroll", updateBackToTop, { passive: true });
