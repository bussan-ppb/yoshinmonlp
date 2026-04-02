/**
 * scatter.js - スキャッター（散らばし）レイアウト用スクリプト
 * スクロール連動アニメーション＋パララックス効果
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- スクロールで要素を表示するアニメーション ---
  // .reveal クラスの要素が画面に入ったら .is-visible を付与
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // 一度表示したら監視を解除
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        // 要素が15%見えた時点でトリガー
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- パララックス効果 ---
  // data-parallax 属性を持つ要素にスクロール連動の移動を適用
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length > 0) {
    // requestAnimationFrame でスクロールイベントを間引き（パフォーマンス対策）
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          parallaxElements.forEach(el => {
            // data-parallax の値（0〜1）で移動量を制御
            const speed = parseFloat(el.dataset.parallax) || 0.05;
            const yOffset = scrollY * speed;
            el.style.transform = `translateY(${yOffset}px)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- ヒーロー写真の初回表示アニメーション ---
  // ページ読み込み時に少し遅延を入れてから表示
  const heroPhotos = document.querySelectorAll('.hero-scatter__photo');
  if (heroPhotos.length > 0) {
    setTimeout(() => {
      heroPhotos.forEach((photo, i) => {
        setTimeout(() => {
          photo.classList.add('is-visible');
        }, i * 200); // 200ms間隔で順番に表示
      });
    }, 300); // ページ読み込み後300ms待ってから開始
  }
});
